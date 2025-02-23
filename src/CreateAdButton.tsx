import { useNavigate } from "react-router-dom";
import Button from "./components/ui/Button.tsx"; // якщо кнопка знаходиться в іншій папці


const CreateAdButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate("/create-ad")} 
      className="btn btn-primary rounded-lg"
    >
      Create Ad
    </Button>
  );
};

export default CreateAdButton;
