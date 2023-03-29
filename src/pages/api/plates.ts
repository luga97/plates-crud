// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from "moment"
import type {NextApiRequest, NextApiResponse} from "next"
import {Plate as Plate} from "../Plates.interface"

const plates: Plate[] = [
  {
    id: 1,
    name: "Espagueti Carbonara",
    startDate: moment("2023-03-28"),
    price: 12,
    color: "amarillo",
    description: "Pasta con salsa cremosa de huevo, panceta y queso parmesano",
  },
  {
    id: 2,
    name: "Ensalada César",
    startDate: moment("2023-04-25"),
    price: 10,
    color: "verde",
    description: "Lechuga romana, crutones, queso parmesano y aderezo César",
  },
  {
    id: 3,
    name: "Pollo Alfredo",
    startDate: moment("2023-03-20"),
    price: 15,
    color: "marrón",
    description:
      "Pasta con salsa cremosa hecha con mantequilla, crema, queso parmesano y pollo",
  },
  {
    id: 4,
    name: "Bistec con Papas Fritas",
    startDate: moment("2023-03-26"),
    price: 22,
    color: "rojo",
    description: "Bistec de solomillo a la parrilla servido con papas fritas",
  },
  {
    id: 5,
    name: "Tabla de Sushi",
    startDate: moment("2023-03-24"),
    price: 18,
    color: "naranja",
    description: "Rollos de sushi surtidos, nigiri y sashimi",
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Plate[]>) {
  const searchTerm = req.query.search?.toString().toLowerCase()
  console.log("searchTerm", searchTerm)

  const filteredPlates = searchTerm
    ? plates.filter(
        (plate) =>
          plate.name.toLowerCase().includes(searchTerm) ||
          plate.description.toLowerCase().includes(searchTerm)
      )
    : plates
  res.status(200).json(filteredPlates)
}
