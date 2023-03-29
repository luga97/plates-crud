import {Plate} from "@/pages/Plates.interface"
import {Modal, Form, Input, InputNumber, Button, DatePicker, ConfigProvider} from "antd"
import moment from "moment"
import React, {useEffect, useState} from "react"

interface EditPlateModalProps {
  open: boolean
  onCancel: () => void
  onOk: (values: Plate) => void
  plate: Plate | null
}

const disabledDate = (current: any) => {
  return current && current < new Date()
}

function EditPlateModal({open, onCancel, onOk, plate}: EditPlateModalProps) {
  const [form] = Form.useForm<Plate>()
  console.log("plato en modal", plate)
  const [loading, setLoading] = useState(false)
  // Define los valores iniciales del formulario a partir de la prop "plate"
  useEffect(() => {
    if (plate) {
      form.setFieldsValue({
        name: plate.name,
        description: plate.description,
        startDate: moment(plate.startDate, "DD/MM/YYYY"),
        price: plate.price,
        color: plate.color,
        id: plate.id,
      })
    }
  }, [form, plate])

  const handleOk = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      console.log("valores validos", values)
      onOk(values as Plate)
    } catch (error) {
      console.log("Error", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    //console.log("cancelando")
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      title="Editar plato"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
      confirmLoading={loading}
      footer={
        <div className="flex justify-between">
          <button
            className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 hover:bg-gray-100"
            onClick={() => handleCancel()}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleOk()}
          >
            Editar
          </button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nombre"
          name="name"
          rules={[
            {required: true, message: "Ingrese el nombre del plato"},
            {
              validator: (_, value) => {
                if (value && value.trim().split(" ").length >= 2) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error("El nombre del plato debe tener al menos dos palabras")
                )
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Descripción"
          name="description"
          rules={[{required: true, message: "Ingrese la descripción del plato"}]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Fecha de inicio"
          name="startDate"
          rules={[
            {required: true, message: "Por favor selecciona una fecha"},
            {
              validator: (_, value) => {
                const selectedDate = new Date(value)
                const currentDate = new Date()
                console.log("selectedDate", selectedDate)
                console.log("currentDate", currentDate)
                if (selectedDate.getTime() >= currentDate.getTime()) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  "La fechad de inicio debe ser mayor o igual que hoy"
                )
              },
            },
          ]}
        >
          <DatePicker disabledDate={disabledDate} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Precio"
          name="price"
          rules={[
            {required: true, message: "Ingrese el precio del plato"},
            {
              type: "number",
              min: 9,
              max: 25,
              message: "El precio debe estar entre $9 y $25",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Color"
          name="color"
          rules={[{required: true, message: "Ingrese el color del plato"}]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditPlateModal
