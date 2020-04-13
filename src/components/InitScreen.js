import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import {connect} from "react-redux";


class InitScreen extends Component {
	constructor(props) {
		super(props);
	}

	async componentWillMount() {
		console.log('langRR..', this.props.lang);

		if (this.props.lang == null)
			this.props.navigation.navigate('language');
		else if (this.props.auth == null || this.props.user == null)
			this.props.navigation.navigate('login');
		else
			this.props.navigation.navigate('drawerNavigator')
	}

	render() {
		return false;
	}
}

const mapStateToProps = ({ auth, profile, lang }) => {
	return {
		auth: auth.user,
		user: profile.user,
		lang: lang.lang
	};
};
export default connect(mapStateToProps, {})(InitScreen);
