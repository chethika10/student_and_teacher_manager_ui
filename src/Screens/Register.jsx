export const Regiser =()=>{
    return(
        <>
        <form >
            <label htmlFor="name">Name</label>
            <input type="text"  id="name" name="name"/>

            <label htmlFor="date">Birthday</label>
            <input type="date" id="Birthday" name="Birthday" />

            <label htmlFor="email">Email</label>
            <input type="email" placeholder="example@example.com" id="email" name="email"/>

            <label htmlFor="userName">UserName</label>
            <input type="text" placeholder="UserName" id="userName" name="userName"/>

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="*******" id="password" name="password"/>

            <label htmlFor="Role">Role</label>
            <input type="text" id="role" name="role"/>
        </form>
        </>
    )
}