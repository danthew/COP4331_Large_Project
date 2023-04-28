import buildPath from '../../BuildPath';

const OK = 200;

const deleteGrocery = async (userInfo) => {
    console.log("[tryGroceries]: getting groceries!");

    let js = JSON.stringify(userInfo);
    console.log(JSON.stringify(userInfo, null, 2));
    let ret = {
        "status": false,
        "success": false,
        "response": null
    };
    
    try {
        var response = await fetch(buildPath('api/deleteIngredientFromPantry'), {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json"}
                /*
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Methods" : "POST"},
                        */
        });
        var res = JSON.parse(await response.text());
        console.log("[tryGroceries]: response from server was: ", JSON.stringify(res, null, 4));
        if (response.status !== OK) {
            console.log("[tryGroceries] ERROR: ", response.status);
        } else {
            console.log("[tryGroceries]: Success");
            var user = {
                // firstName: res.firstName,
                // lastName: res.lastName,
                id: res.userId
            };
        }
        ret["response"] = res;
        ret["status"] = ret["success"] = response.status === OK;
    } catch(e) {
        console.log("[tryGroceries]: caught exception: ", e);
        alert(e.toString());
        return ret;
    }

    console.log("[tryGroceries]: returned: ", JSON.stringify(ret, null, 4));
    return ret;
};

export default deleteGrocery;
