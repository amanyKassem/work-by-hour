import React from "react";
import {I18nManager} from "react-native";
import {createStackNavigator, createAppContainer, createDrawerNavigator} from "react-navigation";

import DrawerCustomization from "./DrawerCustomization";
import Language from "../components/Language";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Notifications from "../components/Notifications";
import Category from "../components/Category";
import Charge from "../components/Charge";
import ReCharge from "../components/ReCharge";
import ReChargeWallet from "../components/ReChargeWallet";
import Congrats from "../components/Congrats";
import Orders from "../components/Orders";
import MyAdds from "../components/MyAdds";
import AddInterest from "../components/AddInterest";
import Rate from "../components/Rate";
import ShareApp from "../components/ShareApp";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import Certify from "../components/Certify";
import Interests from "../components/Interests";
import Settings from "../components/Settings";
import AddCertify from "../components/AddCertify";
import Policy from "../components/Policy";
import Messages from "../components/Messages";
import Chat from "../components/Chat";
import ChangePass from "../components/ChangePass";
import AddDet from "../components/AddDet";
import Socials from "../components/Socials";
import ForgetPass from "../components/ForgetPass";
import VerifyCode from "../components/VerifyCode";
import AddAd from "../components/AddAd";
import CompSug from "../components/CompSug";
import ActivateAcc from "../components/ActivateAcc";
import ContactUs from "../components/ContactUs";
import AddAdCongrats from "../components/AddAdCongrats";
import InitScreen from "../components/InitScreen";
import SearchResult from "../components/SearchResult";
import AdEdit from "../components/AdEdit";
import SubCategories from "../components/SubCategories";
import Favs from "../components/Favs";
import PaymentForm from "../components/PaymentForm";

const drawerCust = (props) => (<DrawerCustomization {...props} />)
const DrawerNavigator = createDrawerNavigator({
	home: Home,
	messages: Messages,
	notifications: Notifications,
	category: Category,
	charge: Charge,
	reCharge: ReCharge,
	reChargeWallet: ReChargeWallet,
	contactUs: ContactUs,
	favs: Favs,
	policy: Policy,
	compSug: CompSug,
	Congrats: Congrats,
	orders: Orders,
	myAdds: MyAdds,
	addInterest: AddInterest,
	rate: Rate,
	shareApp: ShareApp,
	profile: Profile,
	editProfile: EditProfile,
	certify: Certify,
	interests: Interests,
	settings: Settings,
	addCertify: AddCertify,
	chat: Chat,
	addDet: AddDet,
	changePass: ChangePass,
	socials: Socials,
	forgetPass: ForgetPass,
	verifyCode: VerifyCode,
	addAd: AddAd,
	activateAcc: ActivateAcc,
	addAdCongrats: AddAdCongrats,
	subCategories: SubCategories,

}, {
	initialRouteName: 'home',
	drawerPosition: I18nManager.isRTL ? 'right' : 'left',
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	gesturesEnabled: false,
	drawerToggleRoute: 'DrawerToggle',
	contentComponent: drawerCust
})
const AppNavigator = createStackNavigator({
	initScreen: {
		screen: InitScreen,
		navigationOptions: {
			header: null
		}
	},
	language: {
		screen: Language,
		navigationOptions: {
			header: null
		}
	},
	register: {
		screen: Register,
		navigationOptions: {
			header: null
		}
	},
	drawerNavigator: {
		screen: DrawerNavigator,
		navigationOptions: {
			header: null
		}
	},
	subCategories: {
		screen: SubCategories,
		navigationOptions: {
			header: null
		}
	},
	addAd: {
		screen: AddAd,
		navigationOptions: {
			header: null
		}
	},
	favs: {
		screen: Favs,
		navigationOptions: {
			header: null
		}
	},
	addAdCongrats: {
		screen: AddAdCongrats,
		navigationOptions: {
			header: null
		}
	},
	addDet: {
		screen: AddDet,
		navigationOptions: {
			header: null
		}
	},
	adEdit: {
		screen: AdEdit,
		navigationOptions: {
			header: null
		}
	},
	contactUs: {
		screen: ContactUs,
		navigationOptions: {
			header: null
		}
	},
	activateAcc: {
		screen: ActivateAcc,
		navigationOptions: {
			header: null
		}
	},
	compSug: {
		screen: CompSug,
		navigationOptions: {
			header: null
		}
	},
	verifyCode: {
		screen: VerifyCode,
		navigationOptions: {
			header: null
		}
	},
	login: {
		screen: Login,
		navigationOptions: {
			header: null
		}
	},
	forgetPass: {
		screen: ForgetPass,
		navigationOptions: {
			header: null
		}
	},
	socials: {
		screen: Socials,
		navigationOptions: {
			header: null
		}
	},
	changePass: {
		screen: ChangePass,
		navigationOptions: {
			header: null
		}
	},
	searchResult: {
		screen: SearchResult,
		navigationOptions: {
			header: null
		}
	},
	messages: {
		screen: Messages,
		navigationOptions: {
			header: null
		}
	},
	policy: {
		screen: Policy,
		navigationOptions: {
			header: null
		}
	},
	addCertify: {
		screen: AddCertify,
		navigationOptions: {
			header: null
		}
	},
	paymentForm: {
		screen: PaymentForm,
		navigationOptions: {
			header: null
		}
	},
	settings: {
		screen: Settings,
		navigationOptions: {
			header: null
		}
	},
	interests: {
		screen: Interests,
		navigationOptions: {
			header: null
		}
	},
	profile: {
		screen: Profile,
		navigationOptions: {
			header: null
		}
	},
	editProfile: {
		screen: EditProfile,
		navigationOptions: {
			header: null
		}
	},
	certify: {
		screen: Certify,
		navigationOptions: {
			header: null
		}
	},
	shareApp: {
		screen: ShareApp,
		navigationOptions: {
			header: null
		}
	},
	rate: {
		screen: Rate,
		navigationOptions: {
			header: null
		}
	},
	addInterest: {
		screen: AddInterest,
		navigationOptions: {
			header: null
		}
	},
	orders: {
		screen: Orders,
		navigationOptions: {
			header: null
		}
	},
	myAdds: {
		screen: MyAdds,
		navigationOptions: {
			header: null
		}
	},
	notifications: {
		screen: Notifications,
		navigationOptions: {
			header: null
		}
	},
	reChargeWallet: {
		screen: ReChargeWallet,
		navigationOptions: {
			header: null
		}
	},
	congrats: {
		screen: Congrats,
		navigationOptions: {
			header: null
		}
	},
	ReCharge: {
		screen: ReCharge,
		navigationOptions: {
			header: null
		}
	},
	category: {
		screen: Category,
		navigationOptions: {
			header: null
		}
	},
	charge: {
		screen: Charge,
		navigationOptions: {
			header: null
		}
	},
});

export default createAppContainer(AppNavigator);
