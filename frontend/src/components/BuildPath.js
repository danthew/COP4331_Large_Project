exports.buildPath =
function buildPath(route) {
    if(process.env.PORT === 'production') {
        return 'https://recipeasy123.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5001/recipeasy-ec759/us-central1/' + route;
    }
}
