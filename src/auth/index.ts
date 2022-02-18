import passport from 'passport';
import bcrypt from 'bcrypt';
import { UsuariosModel } from '../models/usuarios/usuarios.models'
import { Strategy as LocalStrategy } from 'passport-local';
import { Error } from 'mongoose';
import { Request } from 'express';

interface usuario {
    username: string ,
    password: string ,
    avatar: string ,
    id_usuario: Number | undefined,
    register_date: string ,
    name: string ,
    lastname: string ,
    email: string
}
/**
 * Serializar y deserializar
 */

 passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    UsuariosModel.findById(id, done);
});
/**
 * Seccion Login
 */

passport.use('signin', new LocalStrategy(
    (username, password, done) => {
    UsuariosModel.findOne({ username }, (err: Error, user: usuario) => {
        if(err)
            return done(err);
        
        if(!user){
            console.log('user not found: ' + username);
            return done(null, false)
        }
        if(!isValidPassword(user, password)){
            console.log('invalid pass');
            return done(null, false);
        }

        return done(null, user);
    })
}));

const isValidPassword = (user: usuario, password: string) => {
    return bcrypt.compareSync(password, user.password);
}

/**
 * Sección signup
 */

const takeIdUser = async () => {
    try {
        const userForId = await UsuariosModel.find().sort({id_car:-1}).limit(1);
        const { id_usuario } = userForId[0];
        return id_usuario;
    } catch (error) {
        return 0;
    }
}

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, 
(req: Request, username, password, done) => {
    UsuariosModel.findOne({'username': username}, async (err: Error, user: usuario) => {
        if(err){
            console.log('Error in signup: ' + err);
            return done(err);
        }
        if(user){
            console.log('User already exists');
            return done(null, false);
        }
        const idUser = await takeIdUser();

        const newUser: usuario = {
            username,
            password: createHash(password),
            avatar: req.body.avatar,
            register_date: new Date().toLocaleString(),
            id_usuario: idUser + 1,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email
        }
        UsuariosModel.create(newUser, (err, userWithId) => {
            if(err){
                console.log('Error in saving user: ' + err);
                return done(err);
            }
            console.log(user);
            console.log('User registration succesful');
            return done(null, userWithId);
        })
    })
}))

const createHash = (password: string) => {
    return bcrypt.hashSync(
                            password,
                            bcrypt.genSaltSync(10)
    );
}

