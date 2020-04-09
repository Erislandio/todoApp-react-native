import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import commonStyles from '../styles/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

function Task({ desc, estimateAt, doneAt, id, toggleTasks, onDelete }) {
	const doneOrNotStyle =
		doneAt !== null
			? {
					textDecorationLine: 'line-through'
				}
			: {};

	const date = doneAt ? doneAt : estimateAt;
	const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMM');

	const renderRightActions = () => {
		return (
			<TouchableOpacity style={styles.renderRightActions} onPress={() => onDelete(id)}>
				<Icon name="trash" size={30} color="#fff" />
			</TouchableOpacity>
		);
	};

	const renderLeftActions = () => {
		return (
			<TouchableOpacity style={styles.renderLeftActions}>
				<Icon name="trash" size={20} color="#fff" />
				<Text style={styles.exclude}>Excluir</Text>
			</TouchableOpacity>
		);
	};

	return (
		<Swipeable
			onSwipeableLeftOpen={() => onDelete(id)}
			renderRightActions={renderRightActions}
			renderLeftActions={renderLeftActions}
		>
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={() => toggleTasks(id)}>
					<View style={styles.checkContainer}>{getCheckView(doneAt)}</View>
				</TouchableWithoutFeedback>
				<View>
					<Text style={[ styles.desc, doneOrNotStyle ]}>{desc}</Text>
					<Text style={styles.date}>{formatedDate}</Text>
				</View>
			</View>
		</Swipeable>
	);
}

function getCheckView(doneAt) {
	if (doneAt !== null) {
		return (
			<View style={styles.done}>
				<Icon name="check" size={15} color={commonStyles.colors.secondary} />
			</View>
		);
	}

	return <View style={styles.pending} />;
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderColor: '#aaa',
		borderBottomWidth: StyleSheet.hairlineWidth,
		alignItems: 'center',
		paddingVertical: 13,
		backgroundColor: commonStyles.colors.secondary
	},
	checkContainer: {
		width: '20%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	pending: {
		height: 25,
		width: 25,
		borderRadius: 12.5,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#555'
	},
	done: {
		height: 25,
		width: 25,
		borderRadius: 12.5,
		borderWidth: StyleSheet.hairlineWidth,
		backgroundColor: '#4d7021',
		alignItems: 'center',
		justifyContent: 'center'
	},
	desc: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.mainText,
		fontSize: 15
	},
	date: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.subText,
		fontSize: 12
	},
	renderRightActions: {
		backgroundColor: '#e74c3c',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20
	},
	renderLeftActions: {
		backgroundColor: '#e74c3c',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		flex: 1
	},
	exclude: {
		color: commonStyles.colors.secondary,
		fontFamily: commonStyles.fontFamily,
		fontSize: 13,
		margin: 10
	}
});

export default Task;
