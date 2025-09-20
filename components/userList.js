import { View, Text, Button, StyleSheet } from "react-native"

export default function userList({ users, onUserChanged }) {
    //função para atualizar usuário (PUT)
    const updateUser = async (id) => {
        try {
            const response = await fetch(`http:10.110.12.47:3000/users/${id}`, {
                method: "PUT", //inserir novo registro
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Nome atualizado",
                    email: "Email atualizado"
                })
            })
            await response.json() //converte em resposta
            onUserChanged()

        } catch (error) {
            console.error("Error PUT: ", error.message)
        }
    }

    // função para deletar usuário
    const delUser = async (id) => {
        try {
            await fetch(`http:10.110.12.47:3000/users/${id}`, {
                method: "DELETE"
            })
            onUserChanged() //recarregar a lista de usuários
        } catch (error) {
            console.error("Error DELETE: ", error.message)
        }
    }

    return (
        <View>
            {users.map((u) => (
                <View key={u.id} style={styles.card}>
                    <Text style={styles.text}> {u.name} - {u.email} </Text>
                    <View key={u.id} style={styles.card}>
                        <Button title="Editar" onPress={() => updateUser(u.id)} />
                        <Button title="Excluir" onPress={() => delUser(u.id)} color={"red"} />

                    </View>
                </View>
            ))}
        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "blue",
        borderRadius: 5
    },
    text: {
        fontSize: 6,
        marginBottom: 5,

    },
    Button: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})