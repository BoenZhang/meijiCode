module.exports = shipit => {
    shipit.initConfig({
        default: {
            key: '/Users/xinzhongzhu/.ssh/id_rsa'
        },
        staging: {
            servers: 'root@45.78.58.194:27438'
        },
        development: {
            servers: 'root@139.196.207.229'
        }
    });

    shipit.task('deploy:development', ()=>{
        return shipit.remoteCopy(__dirname + '/build/', '/root/webroot/shenzhou').then(res => console.log(res[0].stdout));
    });

    shipit.task('deploy', () => {
        return shipit.remoteCopy(__dirname + '/build/', '/root/www/tclslider').then(res => console.log(res[0].stdout));
    })
};