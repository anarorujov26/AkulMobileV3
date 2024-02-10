import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccountAddList = async (login, password) => {
    if (await AsyncStorage.getItem("accountList") == null) {

        let accounts = [];
        let account = {
            login: login,
            password: password
        }
        accounts.push(account);

        await AsyncStorage.setItem("accountList", JSON.stringify(accounts));

    } else {


        let accounts = JSON.parse(await AsyncStorage.getItem("accountList"));
        let answer = true
        accounts.forEach(element => {
            if (element.login === login) {
                answer = false;
            }
        });

        if (answer) {
            let account = {
                login: login,
                password: password
            }
            accounts.push(account);

            await AsyncStorage.setItem("accountList", JSON.stringify(accounts));
        }
    }
}

export default getAccountAddList;