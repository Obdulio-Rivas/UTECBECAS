
const index = (req, res) =>{
    if(req.session.data_user !== undefined){
        res.redirect('/dashboard');
    }else{
        res.render('index');
    }
};

const home = () =>{

};

module.exports = {index};