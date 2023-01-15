let count = 0;
module.exports.viewCount = (req, res, next) => {
    count++;
    res.send('counting.....')
    console.log(count);
    next()
}