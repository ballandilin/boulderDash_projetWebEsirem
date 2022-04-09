// class to add some utils methods
export class utils {
    // method to get the key in the local storage
    getKeyList() {
        let keyList = [];
        for (let i = 0; i < localStorage.length; i++) {
            keyList.push(localStorage.key(i));
        }
        return keyList;
    }
}