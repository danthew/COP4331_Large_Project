import buildPath from '../BuildPath';

const OK = 202;

const tryRegister = async (registerInfo) => {
    console.log("[tryRegister]: registering!");

    let js = JSON.stringify(registerInfo);
    console.log(JSON.stringify(registerInfo, null, 2));
    let ret = {
        "status": false,
        "success": false,
        "response": null
    };
    
    try {
        var response = await fetch(buildPath('api/register'), {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json"}
                /*
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Methods" : "POST"},
                        */
        });
        var res = JSON.parse(await response.text());
        console.log("[tryRegister]: response from server was: ", JSON.stringify(res, null, 4));
        if (response.status !== OK) {
            console.log("[tryRegister] ERROR: ", response.status);
        } else {
            console.log("[tryRegister]: Success");
            var user = {
                // firstName: res.firstName,
                // lastName: res.lastName,
                id: res.userId
            };
        }
        ret["response"] = res;
        ret["status"] = ret["success"] = response.status === OK;
    } catch(e) {
        console.log("[tryRegister]: caught exception: ", e);
        alert(e.toString());
        return ret;
    }

    console.log("[tryRegister]: returned: ", JSON.stringify(ret, null, 4));
    return ret;
};

export default tryRegister;
