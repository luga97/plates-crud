import Head from "next/head"
import Image from "next/image"
import {Inter} from "next/font/google"
import styles from "@/styles/Home.module.css"
import {useEffect, useState} from "react"
import axios from "axios"
import {Table, Input, Button, Space, ConfigProvider} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import {Plate} from "./Plates.interface"
import EditPlateModal from "@/components/EditPlateModal"
import es_ES from "antd/locale/es_ES"

const {Search} = Input

export default function Home() {
  const [plates, setPlates] = useState<Plate[]>([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentEditPlate, setCurrentEditPlate] = useState<Plate | null>(null)
  useEffect(() => {
    const fetchPlates = async () => {
      const response = await axios.get("/api/plates")
      setPlates(response.data)
    }
    fetchPlates()
  }, [])

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, plate: Plate) => {
        function handleEdit(plate: Plate): void {
          console.log(`editar plato con id ${plate.id}`)
          setCurrentEditPlate(plate)
        }

        function handleDelete(plate: Plate): void {
          console.log(`eliminar plato con id ${plate.id}`)
        }

        return (
          <Space size="middle">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleEdit(plate)}
            >
              Editar
            </button>

            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(plate)}
            >
              Eliminar
            </button>
          </Space>
        )
      },
    },
  ]

  const addPlate = async () => {
    console.log("anadir plato")
  }

  const onSearch = async (search: string) => {
    const response = await axios.get(`/api/plates?search=${search}`)
    console.log(response.data)
    setPlates(response.data)
  }

  return (
    <ConfigProvider locale={es_ES}>
      <div className="container mx-auto my-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Platos</h1>
          <Search placeholder="Search" onSearch={onSearch} style={{width: 200}} />
        </div>
        <Table columns={columns} dataSource={plates} />
        <button
          onClick={addPlate}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Añadir plato
        </button>
      </div>
      <EditPlateModal
        open={currentEditPlate !== null}
        onCancel={() => {
          setCurrentEditPlate(null)
          console.log("cancelando")
        }}
        onOk={() => {
          setCurrentEditPlate(null)
        }}
        plate={currentEditPlate}
      />
    </ConfigProvider>
  )
}

/*
Se te ha solicitado crear una aplicación CRUD completa que maneje datos de platos de comida, utilizando cualquier lenguaje de programación y base de datos. La aplicación debe cumplir con los siguientes requisitos:

Agregar un plato a la base de datos.
Modificar un plato existente en la base de datos.
Eliminar un plato existente en la base de datos.
Visualizar una lista de platos activos, donde se muestren solo los platos cuya fecha de inicio de actividad es mayor o igual a hoy.
El frontend de la aplicación puede ser desarrollado utilizando cualquier tecnología.
El precio de un plato debe estar entre 9 y 25 dólares.
El nombre de un plato debe tener al menos dos palabras.
Los campos requeridos para cada plato son: ID, Nombre, Fecha Inicio Actividad, Precio, Color y Oferta (Sí/No).
Para cumplir con estos requisitos, debes crear una aplicación que permita al usuario agregar, modificar y eliminar platos de la base de datos, y visualizar una lista de platos activos en el frontend. Además, la aplicación debe validar que los datos ingresados sean correctos, es decir, que el precio esté dentro del rango de 9 a 25 dólares, que el nombre tenga al menos dos palabras y que el plato esté activo si su fecha de inicio de actividad es mayor o igual a hoy.
*/
