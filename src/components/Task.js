import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import commonStyles from '../styles/commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

function Task({ desc, estimateAt, doneAt, id, toggleTasks }) {
	const doneOrNotStyle =
		doneAt !== null
			? {
					textDecorationLine: 'line-through'
				}
			: {};

	const date = doneAt ? doneAt : estimateAt;
	const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMM');

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={() => toggleTasks(id)}>
				<View style={styles.checkContainer}>{getCheckView(doneAt)}</View>
			</TouchableWithoutFeedback>
			<View>
				<Text style={[ styles.desc, doneOrNotStyle ]}>{desc}</Text>
				<Text style={styles.date}>{formatedDate}</Text>
			</View>
		</View>
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
		paddingVertical: 13
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
	}
});

export default Task;
