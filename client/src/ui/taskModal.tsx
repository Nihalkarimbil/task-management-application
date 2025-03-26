import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { useSections } from "@/hooks/useSection";
import { useTask } from "@/hooks/useTask";

interface User {
    id: string;
    name: string;
    profileImage: string;
}

export interface Task {
    title: string;
    description: string;
    dueDate: string;
    status: string;
    assignee: User | null;
}

const dummyUsers: User[] = [
    { id: "1", name: "Alice Johnson", profileImage: "https://i.pravatar.cc/40?img=1" },
    { id: "2", name: "Bob Smith", profileImage: "https://i.pravatar.cc/40?img=2" },
    { id: "3", name: "Charlie Brown", profileImage: "https://i.pravatar.cc/40?img=3" },
    { id: "4", name: "Diana Prince", profileImage: "https://i.pravatar.cc/40?img=4" },
];

const TaskModal = ({ onClose }: { onClose: () => void }) => {
    const {addTaskMutation}=useTask()
    const [task, setTask] = useState<Task>({
        title: "",
        description: "",
        dueDate: "",
        status: "",
        assignee: null,
    });

    const { sections } = useSections();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedUser = dummyUsers.find((user) => user.id === e.target.value);
        setTask({ ...task, assignee: selectedUser || null });
    };

    const handleSubmit = async() => {
        console.log("Task Added:", task);
        await addTaskMutation.mutateAsync(task)
        setTask({ title: "", description: "", dueDate: "", status: "", assignee: null });
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add New Task</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    margin="dense"
                    value={task.title}
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    margin="dense"
                    multiline
                    rows={3}
                    value={task.description}
                    onChange={handleChange}
                />
                <TextField
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    value={task.dueDate}
                    onChange={handleChange}
                />
                <TextField
                    select
                    label="Status"
                    name="status"
                    fullWidth
                    margin="dense"
                    value={task.status}
                    onChange={handleChange}
                >
                    {sections.map((sec: { _id: string; name: string }) => (
                        <MenuItem key={sec._id} value={sec.name}>
                            {sec.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Assignee"
                    name="assignee"
                    fullWidth
                    margin="dense"
                    value={task.assignee?.id || ""}
                    onChange={handleAssigneeChange}
                >
                    {dummyUsers.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            <ListItem disableGutters>
                                <ListItemAvatar>
                                    <Avatar src={user.profileImage} alt={user.name} />
                                </ListItemAvatar>
                                <ListItemText primary={user.name} />
                            </ListItem>
                        </MenuItem>
                    ))}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Add Task
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskModal;
