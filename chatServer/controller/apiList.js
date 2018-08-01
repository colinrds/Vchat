const apiModel = require("../model/apiModel");

// 0成功 -1失败
const getUser = (req,res) => {
    apiModel.getUser((r) => { // 获取用户
        res.json({
            code : 0,
            data : r
        })
    })
};

const login = (req, res) => {
    let params = req.body;
    apiModel.login(params, (r) => { // 登录
        if (r.code === 0) {
            req.session.login = params.name;
            res.json({
                code : 0,
                data : r,
                msg: '登录成功'
            })
        } else {
            res.json({
                code : -1,
                data : '账号不存在或密码错误'
            })
        }
    })
};

const signUp = (req, res) => {
    let params = req.body;
    apiModel.signUp(params, (r) => { // 注册
        if (r.code === 1) {
            res.json({
                code : 1,
                data : '账号已存在'
            })
        } else if (r['_id']) {
            res.json({
                code : 0,
                data : '注册成功'
            })
        } else {
            res.json({
                code : -1,
                data : '注册失败'
            })
        }
    })
};

const loginOut = (req, res) => { // 登出
    req.session.destroy();
    res.json({
        code: 0,
        data: '退出成功'
    })
};

const getUserInfo = (req, res) => {
    apiModel.getUserInfo(req.session.login, (r) => { // 获取登录用户信息
        if (r.code === 0) {
            res.json({
                code : 0,
                data : r.data
            })
        } else {
            res.json({
                code : -1,
                data : ''
            })
        }
    })
};

const createGroup = (req, res) => { // 新建群
    let params = req.body;
    params.userName = req.session.login;
    apiModel.createGroup(params, (r) => {
        if (r.code === 0) {
            res.json({
                code : 0,
                data : r.data['_id']
            })
        } else {
            res.json({
                code : -1,
                data : '创建失败'
            })
        }
    })
};

module.exports = {
    getUser,
    login,
    signUp,
    loginOut,
    getUserInfo,
    createGroup
};