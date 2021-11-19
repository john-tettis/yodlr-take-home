class API{
    /**
     * 
     * @param {*} data object containing email, firstName, lastName
     */
    static async register(data){
        try{
            //register user
            let res = await axios.post(`/users`,data)
            window.localStorage.setItem('user',JSON.stringify(res.data))
            return res.status

        }
        catch(e){
            return {error:e}
        }
    }
    static async fetch(){
        try {
            let res = await axios.get('/users')
            return res.data
        } catch (error) {
            return {error:'something went wrong'}
        }
    }
    static async getUser(id){
        try {
            let res = await axios.get(`/users/${id}`)
            return res.data
        } catch (error) {
            return {error:'something went wrong'}
        }
    }
    static async deleteUser(id){
        try {
            let res = await axios.delete(`/users/${id}`)
            return res.data
        } catch (error) {
            return {error}
            
        }

    }
    static async update(id,data){
        try{
            let user = await this.getUser(id);
            let res = await axios.put(`/users/${id}`,{...user,...data})
            return res.data
        }
        catch(e){
            return {error:'Update failed'}
        }
        
    }
}