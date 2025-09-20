import { useState } from "react"
import { View, TextInput, Button, StyleSheet } from "react-native"

export default function userForm({ onUserAdded }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    // função que adiciona usuário (POST)
    const addUser = async () => {
        if (!name || !email) return
        try {
            await fetch("http:10.110.12.47:3000/users", {
                method: "POST", //inserir novo registro
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }) //converte objeto em JSON

            })
            setName("") //limpo campo name
            setEmail("") //limpo campo email
            onUserAdded() //recarregar a lista de usuarios


        } catch (error) {
            console.error("Error POST: ", error.message)
        }
    }

    return (
        <View style={styles.form}>
            <TextInput style={styles.input}
                placeholder="nome" value={name}
                onChangeText={setName} />

            <TextInput style={styles.input}
                placeholder="email" value={email}
                onChangeText={setEmail} />

            <Button title="Adiciona usuário" onPress={addUser} />
        </View>
    )
}

const styles = StyleSheet.create({
    form: { marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "blue",
        padding: 8,
        marginBottom: 10,
        borderRadius: 5
    }
})