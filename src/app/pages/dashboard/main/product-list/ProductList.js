import {useEffect, useState} from "react";
import CardProductList from "./card-product-list/CardProductList";
import {useDispatch, useSelector} from "react-redux";
import {getPowerPlants} from "../../../../store/powerPlantsSlice";
import ModalProductDetail from "../../shared-component/modal-product-detail/ModalProductDetail";
import {Modal} from "@mui/material";

function ProductList(props) {
    const dispatch = useDispatch();
    let powerPlants = useSelector(({powerPlants}) => powerPlants);

    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    useEffect(() => {
        let mockNumOfPlants = 4;
        dispatch(getPowerPlants(mockNumOfPlants));
    }, [dispatch]);


    function openPowerPlantModal(id) {
        return () => {
            setSelectedProduct(powerPlants.find(el => el.id === id));
            setOpen(true);
        }
    }

    return (
        <div>
            <h4 className="dashboardMain__title">Купить «зелёную» энергию</h4>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "24px",
            }}>
                {
                    powerPlants.map(el => {
                        return <CardProductList
                            key={el.id}
                            name={el.title}
                            price={el.price}
                            location={el.location}
                            powerStation={el.powerStation}
                            availableEnergy={el.availablePower}
                            onClick={openPowerPlantModal(el.id)}
                        />
                    })
                }

            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalProductDetail
                    product={selectedProduct}
                    closed={() => setOpen(false)}
                    mode={'add'}
                />
            </Modal>
        </div>
    );
}

export default ProductList;
