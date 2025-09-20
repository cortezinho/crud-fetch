import { useState } from "react"
import {View, TextInput, Button, StyleSheet } from "react-native"

export default function userForm({onUserAdded}){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    
    // função que adiciona usuário (POST)
    const addUser = async () => {
        if (!name || !email) return
        try{
            await fetch("http:trocar por ip:3000/users",{
                method: "POST", //inserir novo registro
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({name, email}) //converte objeto em JSON

            })

        } catch (error){

        }
    }
}