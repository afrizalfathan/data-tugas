import Nav from "./components/Nav"
import "./style/style.css"
import { React, useState } from "react"
import { Button, Modal, Form, Table } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import DataTable from "./components/DataTable"
import { useEffect } from "react"
function App() {
    const [matakuliah, setMatakuliah] = useState("")
    const [tugas, setTugas] = useState("")
    const [deadline, setDeadline] = useState("")
    const [edit, setEdit] = useState("")
    const [homework, setHomework] = useState(getDataFromLocalStorage())
    const [keterangan, setKeterangan] = useState("")
    const [nomor, setNomor] = useState(1)
    const [show, setShow] = useState(false)
    const [tambah, setTambah] = useState("Tambah Data")
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        localStorage.setItem("tugas", JSON.stringify(homework))
    })

    function getDataFromLocalStorage() {
        const tugasData = localStorage.getItem("tugas")
        if (tugasData) {
            return JSON.parse(tugasData)
        } else {
            return []
        }
    }

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    // Fungsi menghapus data
    function deleteHandler(siswaId) {
        const filteredSiswa = homework.filter(
            (siswa) => siswa.id !== siswaId,
            setNomor(nomor - 1)
        )
        setHomework(filteredSiswa)
    }

    // fungsi untuk memasukan data dalam field untuk pengecekan form
    function findFormErrors() {
        const newErrors = {}
        if (!matakuliah || matakuliah === "")
            newErrors.matakuliah = "Mata Kuliah tidak boleh kosong!"
        if (!tugas || tugas === "")
            newErrors.tugas = "Tugas tidak boleh kosong!"
        if (!deadline || deadline === "")
            newErrors.deadline = "Deadline tidak boleh kosong!"
        if (!keterangan || keterangan === "")
            newErrors.keterangan = "Deadline tidak boleh kosong!"

        return newErrors
    }

    // Fungsi untuk mengerate data key
    function generateKey() {
        return Date.now()
    }

    //fungsi menyimpan data
    function saveData(e) {
        e.preventDefault()
        const newErrors = findFormErrors()

        // kondisi jika suatu form kosong
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        } else {
            setValidated(true)
            if (edit.id) {
                const newData = {
                    id: edit.id,
                    matakuliah,
                    tugas,
                    deadline,
                    keterangan,
                }

                const editSiswaIndex = homework.findIndex(
                    (homeworks) => homeworks.id === edit.id
                )

                const updatedData = [...homework]

                updatedData[editSiswaIndex] = newData
                setHomework(updatedData)

                return cancelEditHandler()
            }

            setHomework([
                ...homework,
                {
                    id: generateKey(),
                    tugas,
                    matakuliah,
                    deadline,
                    keterangan,
                },
            ])

            setTambah("Tambah Data")
            setMatakuliah("")
            setTugas("")
            setDeadline("")
            setKeterangan("")
            handleClose()
        }
    }

    // fungsi jika tombol tambah diklik
    function handleModalShow() {
        handleShow()
        setTambah("Tambah Data")
        setMatakuliah("")
        setTugas("")
        setDeadline("")
        setKeterangan("")
    }

    // fungsi jika tombol edit diklik

    function editHandler(homeworks) {
        handleShow()
        setEdit(homeworks)
        setTambah("Edit Data")
        setMatakuliah(homeworks.matakuliah)
        setTugas(homeworks.tugas)
        setKeterangan(homeworks.keterangan)
    }

    // fungsi jika tombol close edit diklik

    function cancelEditHandler() {
        setEdit({})
        setMatakuliah("")
        setTugas("")
        setDeadline("")
        setKeterangan("")
        handleClose()
    }

    return (
        <div className="App">
            <Nav />
            <div className="form-create">
                <Button
                    variant="primary"
                    className="mt-5"
                    onClick={handleModalShow}
                >
                    Tambah <FontAwesomeIcon icon={faCirclePlus} />
                </Button>
                {/* Modal dan form */}

                <Form noValidate validated={validated}>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{tambah}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3 mt-3" role="form">
                                <Form.Label>Mata Kuliah : </Form.Label>
                                <Form.Control
                                    name="mataKuliah"
                                    type="text"
                                    placeholder="Masukkan Mata Kuliah..."
                                    onChange={(e) =>
                                        setMatakuliah(e.target.value)
                                    }
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Kolom Mata Kuliah wajib diisi!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Label>Tugas : </Form.Label>
                                <Form.Control
                                    name="tugas"
                                    type="text"
                                    placeholder="Masukkan Tugas..."
                                    onChange={(e) => setTugas(e.target.value)}
                                    value={tugas}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Kolom Tugas wajib diisi!
                                </Form.Control.Feedback>
                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label>Deadline : </Form.Label>
                                    <Form.Control
                                        name="deadline"
                                        type="text"
                                        placeholder="Masukkan deadline..."
                                        onChange={(e) =>
                                            setDeadline(e.target.value)
                                        }
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Kolom deadline wajib diisi!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3 mt-3">
                                    <Form.Label>Keterangan : </Form.Label>
                                    <Form.Control
                                        name="keterangan"
                                        type="text"
                                        placeholder="Masukkan keterangan..."
                                        onChange={(e) =>
                                            setKeterangan(e.target.value)
                                        }
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Kolom Keterangan wajib diisi!
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            {edit.id ? (
                                <Button
                                    onClick={handleClose}
                                    variant="secondary"
                                >
                                    Close Edit
                                </Button>
                            ) : (
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                            )}
                            <Button variant="success" onClick={saveData}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            </div>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Tugas</th>
                        <th>Mata Kuliah</th>
                        <th>Deadline</th>
                        <th>Keterangan</th>
                        <th>Pilihan</th>
                    </tr>
                </thead>
                {homework.map((homeworks) => (
                    <DataTable
                        key={homeworks.id}
                        homework={homeworks}
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                    ></DataTable>
                ))}
            </Table>
        </div>
    )
}

export default App
