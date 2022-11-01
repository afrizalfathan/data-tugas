import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { React } from "react"

const DataTable = ({ homework, deleteHandler, editHandler }) => {
    return (
        <tbody>
            <tr>
                <td>{homework.tugas}</td>
                <td>{homework.matakuliah}</td>
                <td>{homework.deadline}</td>
                <td>{homework.keterangan}</td>
                <td>
                    <Button
                        variant="success"
                        onClick={editHandler.bind(this, homework)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={deleteHandler.bind(this, homework.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
            </tr>
        </tbody>
    )
}

export default DataTable
