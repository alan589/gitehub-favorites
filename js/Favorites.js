class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.tbody = this.root.querySelector('table tbody')
        this.load()
    }

    load(){
        // this.users = [
        //     {
        //     login: 'alan589',
        //     name: 'Alan Cavalcante',
        //     public_repos: '55',
        //     followers: '1000'        
        //     },
        //     {
        //     login: 'maykbrito',
        //     name: 'AJulio cesar',
        //     public_repos: '222',
        //     followers: '123000'        
        //     },
        //     {
        //     login: 'allan',
        //     name: 'Joao Fabio',
        //     public_repos: '515',
        //     followers: '11000'        
        //     }
        // ]

        this.users = JSON.parse(localStorage.getItem('@github-users:')) || []
        console.log(this.users)
    }

    delete(deletedUser){
        const filteredUsers = this.users.filter(user => deletedUser.login !== user.login)
        this.users = filteredUsers
        this.update()
    }

    add(user) {
        this.users.push({
            login: user,
            name: 'teste',
            public_repos: '0',
            followers: '0'        
            })
    }
}

export class FavoritesView extends Favorites {
    constructor(root){
        super(root)
        this.update()
    }

    update(){

        if(this.users.length !== 0)
        {
            this.removeAllTableRow()  
    
            this.users.forEach((user) => {
                const tr = this.tbody.appendChild(this.createTableRow(user))
                tr.querySelector('.remove').onclick = () => {
                    const isOk = confirm('Deletar?')
                    if(isOk) {
                        this.delete(user)
                    }
                }
            })
        }
        else {
            const tr = document.createElement('tr')
            tr.innerHTML = '<td colspan="4" style="text-align:center;">No user</td>'
            this.tbody.appendChild(tr)
        }
    }

    createTableRow(user){

        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td class="user">
                <img src="https://www.github.com/${user.login}.png" alt="${user.login}'s photo">
                <a href="https://www.github.com/${user.login}" target=_blank>
                    <p>${user.name}</p>
                    <span>${user.login}</span>
                </a>
            </td>
            <td>${user.public_repos}</td>
            <td>${user.followers}</td>
            <td>
                <button class="remove">&times;</button>
            </td>
        `
        return tr
    }

    removeAllTableRow() {
        const tbody = this.root.querySelector('table tbody')

        tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })
    }
}