exports.buildPath =
function buildPath(route) {
    if(process.env.NODE_ENV === 'production') {
        return 'https://us-central1-recipeasy-ec759.cloudfunctions.net/' + route;
    }
    else {
        return 'http://localhost:5001/recipeasy-ec759/us-central1/' + route;
    }
}
