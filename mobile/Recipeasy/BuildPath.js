const buildPath = (route)=> {
    if (process.env.NODE_ENV === 'production') {
        console.log('Buildpath: https://recipeasy123.herokuapp.com/' + route);
        return 'https://recipeasy123.herokuapp.com/' + route;
    } else {
        // return 'https://recipeasy123.herokuapp.com/' + route;
        console.log('https://us-central1-recipeasy-ec759.cloudfunctions.net/' + route);
        return 'https://us-central1-recipeasy-ec759.cloudfunctions.net/' + route;
        // return 'http://localhost:5001/recipeasy-ec759/us-central1/' + route;
    }
}

export default buildPath;
