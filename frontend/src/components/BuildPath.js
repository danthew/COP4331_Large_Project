exports.buildPath =
function buildPath(route) {
    if(process.env.NODE_ENV === 'production') {
        return 'https://recipeasy123.herokuapp.com/' + route;
    }
    else {
        //return 'http://localhost:5000/' + route;
        return 'http://localhost:5000/recipeasy-ec759/us-central1/' + route;
    }
}
