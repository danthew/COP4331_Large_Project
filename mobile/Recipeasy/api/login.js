import buildPath from '../BuildPath';

const OK = 202;

const tryLogin = async (loginInfo) => {
    console.log("logging in!");

    let js = JSON.stringify(loginInfo);
    console.log(JSON.stringify(loginInfo, null, 2));
    let ret = {
        "status": false,
        "success": false,
        "response": null
    };
    
    try {
        var response = await fetch(buildPath('api/login'), {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json"}
                /*
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Methods" : "POST"},
                        */
        });
        var res = JSON.parse(await response.text());
        console.log("[tryLogin]: response from server was: ", JSON.stringify(res, null, 4));
        if (response.status !== OK) {
            console.log("[login] ERROR: ", response.status);
        } else {
            console.log("[login]: Success");
            var user = {
                // firstName: res.firstName,
                // lastName: res.lastName,
                id: res.userId
            };
        }
        ret["response"] = res;
        ret["status"] = ret["success"] = response.status === OK;
    } catch(e) {
        console.log("[tryLogin]: caught exception: ", e);
        alert(e.toString());
        return ret;
    }

    return ret;
};

export default tryLogin;
