import buildPath from '../BuildPath';

const OK = 200;

const tryGetGroceryList = async (userInfo) => {
    console.log("[getGroceries]: getting groceries!");

    let js = JSON.stringify(userInfo);
    console.log(JSON.stringify(userInfo, null, 2));
    let ret = {
        "status": false,
        "success": false,
        "response": null
    };
    
    try {
        var response = await fetch(buildPath('api/listPantryIngredients'), {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json"}
                /*
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Methods" : "POST"},
                        */
        });
        var res = JSON.parse(await response.text());
        console.log("[getGroceries]: response from server was: ", JSON.stringify(res, null, 4));
        if (response.status !== OK) {
            console.log("[getGroceries] ERROR: ", response.status);
        } else {
            console.log("[getGroceries]: Success");
            var user = {
                // firstName: res.firstName,
                // lastName: res.lastName,
                id: res.userId
            };
        }
        ret["response"] = res;
        ret["status"] = ret["success"] = response.status === OK;
    } catch(e) {
        console.log("[getGroceries]: caught exception: ", e);
        alert(e.toString());
        return ret;
    }

    console.log("[getGroceries]: returned: ", JSON.stringify(ret, null, 4));
    return ret;
};

export default tryGetGroceryList;
