import { NextFunction, Request, Response } from "express";

//register
const getRegister = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('registro');
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const postRegister = (req: Request, res: Response, next: NextFunction)=> {
    try {
        let user = req.user;
        console.log(user);
        res.render('pagina', { user })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const getFailregister = (req: Request, res: Response) => {
    console.log('error en registro');
    res.render('failregister')
}

//Login
const getLogin =(req: Request, res: Response, next: NextFunction): void => {
        try {
            if(req.isAuthenticated()){
                console.log(req);
                let user = req.user;
                console.log('user logueado');
                res.render('pagina', {user})
            } else {
                console.log('usuario no logueado');
                res.render('login');
            }
        } catch (error) {
            console.log(error);
            next(error)
        }
}

const postLogin =(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('el req', req.body.username);
            let user = { username: req.body.username};
            res.render('pagina', { user });
    } catch (error) {
        next(error)
    }
}

const getFaillogin = (req: Request, res: Response)  => {
    console.log('login fail');
    res.render('faillogin', {});
}

const getLogout = (req: Request, res: Response)  => {
    req.logout();
    res.render('login');
}

export { getRegister, postRegister, getFailregister, getLogin, postLogin, getFaillogin, getLogout}