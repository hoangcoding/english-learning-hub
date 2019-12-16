import withLayout from "../../hocs/Layout";
import Lessons from '../../containers/Lessons';
import requiresAuth from "../../hocs/requiresAuth";
export default requiresAuth(withLayout(Lessons));
