import React, { Fragment, Component } from 'react';
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	StatusBar,
	FlatList,
	TouchableOpacity,
	Platform,
	Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../styles/commonStyles';
import Task from '../components/Task';
import AddTasks from './AddTasks';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';

const intial_state = {
	showModal: false,
	showDoneTasks: false,
	visibleTasks: [],
	tasks: []
};

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...intial_state
		};
	}

	componentDidMount = async () => {
		const stateString = await AsyncStorage.getItem('state');
		const state = JSON.parse(stateString) || intial_state;

		this.setState({ ...state });

		this.filterTasks();
	};

	toggleTasks = (id) => {
		const tasks = [ ...this.state.tasks ];
		tasks.forEach((task) => {
			if (task.id === id) {
				task.doneAt = task.doneAt ? null : new Date();
			}
		});

		this.setState({ tasks }, this.filterTasks);
	};

	toggleFilter = () => {
		this.setState({ ...this.state, showDoneTasks: !this.state.showDoneTasks }, () => {
			this.filterTasks();
		});
	};

	filterTasks = () => {
		let visibleTasks = null;
		if (this.state.showDoneTasks) {
			visibleTasks = [ ...this.state.tasks ];
		} else {
			const pedding = (task) => task.doneAt === null;
			visibleTasks = this.state.tasks.filter(pedding);
		}

		this.setState({ ...this.state, visibleTasks });
		AsyncStorage.setItem('state', JSON.stringfy(this.state));
	};

	addTasks = (newTasks) => {
		if (!newTasks.desc || !newTasks.date) {
			Alert.alert('Dados inválidos', 'Descrição não foi informada ');
		}

		const tasks = [ ...this.state.tasks ];

		const { desc, date } = newTasks;

		tasks.push({
			id: Math.random(),
			desc,
			estimateAt: date,
			doneAt: null
		});

		this.setState({ ...this.state, tasks, showModal: false });
	};

	removeTask = (id) => {
		const tasks = this.state.tasks.filter((task) => task.id !== id);
		this.setState({ ...this.state, tasks }, this.filterTasks);
	};

	render() {
		const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
		const { showDoneTasks, showModal } = this.state;

		return (
			<Fragment>
				<StatusBar hidden />
				<View style={styles.container}>
					<AddTasks
						isVisible={showModal}
						onCancel={() => this.setState({ ...this.state, showModal: false })}
						onSave={this.addTasks}
					/>
					<ImageBackground source={todayImage} style={styles.imageBackground}>
						<View style={styles.iconBar}>
							<TouchableOpacity onPress={this.toggleFilter}>
								<Icon name={`${showDoneTasks ? 'eye' : 'eye-slash'}`} color="#fff" size={20} />
							</TouchableOpacity>
						</View>
						<View style={styles.titleBar}>
							<Text style={styles.title}>Hoje</Text>
							<Text style={styles.subTitle}>{today}</Text>
						</View>
					</ImageBackground>
					<View style={styles.taskList}>
						<FlatList
							showsVerticalScrollIndicator={false}
							scrollEnabled
							data={this.state.visibleTasks}
							keyExtractor={(item) => `${item.id}`}
							renderItem={({ item }) => {
								return <Task {...item} toggleTasks={this.toggleTasks} onDelete={this.removeTask} />;
							}}
						/>
					</View>
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.addButton}
						onPress={() => this.setState({ ...this.state, showModal: !this.state.showModal })}
					>
						<Icon name="plus" size={20} color={commonStyles.colors.secondary} />
					</TouchableOpacity>
				</View>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	imageBackground: {
		flex: 3
	},
	taskList: {
		flex: 7
	},
	titleBar: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	title: {
		fontFamily: commonStyles.fontFamily,
		fontSize: 50,
		color: commonStyles.colors.secondary,
		marginLeft: 20,
		marginBottom: 20
	},
	subTitle: {
		fontSize: 20,
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		marginLeft: 20,
		marginBottom: 30
	},
	iconBar: {
		flexDirection: 'row',
		marginHorizontal: 20,
		justifyContent: 'flex-end',
		marginTop: Platform.OS === 'ios' ? 30 : 20
	},
	addButton: {
		position: 'absolute',
		right: 30,
		bottom: 30,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: commonStyles.colors.today,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
