import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserForm } from "./components/userForm";
import { UserList } from "./components/userList";


export default function app() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  // função GET - buscar usuário
  const fetchUsers = async () => {
    try {
      setLoading(true) // ativa indicador de carregamento

      // GET para carregar usuáriios
      const response = await fetch("http:10.110.12.47:3000/users")

      // converte a resposata em JSON
      const data = await response.json()

      // carrega usuários
      setUsers(data)
    } catch (error) {
      console.error("Erro GET: ", error.message)
    }
    finally {
      setLoading(false) //finaliza o carregamento
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}> CRUD com FETCH </Text>
      <UserForm onUserAdded={fetchUsers} />
      <ScrollView>
        {loading ? (<Text>Carregando...</Text>) : (<UserList users={users} onUserChanged={fetchUsers} />)}
      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,

  },
  Button: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})