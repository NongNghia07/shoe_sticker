import { Paper } from "@mui/material";

export default function Item({ item }) {
    return (
        <Paper>
            <img className="img-Carouse"
                src={typeof item.file == 'object' ? URL.createObjectURL(item.file) : item.file} />
        </Paper>
    )
}
