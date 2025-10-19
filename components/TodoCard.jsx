import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useThemedColor from "../Hooks/useThemedColor";

const TodoCard = ({ todo }) => {
  const [Colors] = useThemedColor();

  return (
    <View style={styles.container}>
      {/** Completed Indicator */}
      <TouchableOpacity>
        <View
          style={[
            styles.completedBar,
            { backgroundColor: todo.completed ? Colors.accent : "#334155" },
          ]}
        >
          <Ionicons
            name={todo.completed ? "checkmark" : ""}
            size={15}
            color={Colors.textPrimary}
          />
        </View>
      </TouchableOpacity>

      {/** Todo Title & Actions */}
      <View
        style={{
          gap: 20,
        }}
      >
        <Text>
          <Text style={{ color: Colors.textPrimary, fontSize: 18 }}>
            {todo.title}
          </Text>
        </Text>
        <View style={styles.btnsContainer}>
          <TouchableOpacity>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                backgroundColor: Colors.secondary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="edit" size={15} color={"#F8FAFC"} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                backgroundColor: Colors.delete,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="delete" size={15} color={"#F8FAFC"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 28,
    backgroundColor: "#1E293B",
    borderRadius: 25,
    marginVertical: 12,
    gap: 20,
  },
  completedBar: {
    height: 30,
    width: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnsContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
