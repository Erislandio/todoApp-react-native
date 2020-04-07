import React, { Component } from 'react';
import {
	Modal,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Text,
	TextInput,
	TouchableOpacity,
	Platform
} from 'react-native';
import commonStyles from '~/styles/commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

const initialState = {
	desc: '',
	date: new Date(),
	showDatePicker: false
};

export default class AddTasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState
		};
	}

	getTimePicker = () => {
		let datePicker = (
			<DateTimePicker
				value={this.state.date}
				mode="date"
				onChange={(_, date) =>
					this.setState({
						date,
						showDatePicker: false
					})}
			/>
		);

		if (Platform.OS === 'android') {
			datePicker = <View />;
		}

		return datePicker;
	};

	render() {
		const { onCancel, isVisible } = this.props;

		return (
			<Modal transparent visible={isVisible} onRequestClose={onCancel} animationType="slide">
				<TouchableWithoutFeedback onPress={onCancel}>
					<View style={styles.background} />
				</TouchableWithoutFeedback>
				<View style={styles.container}>
					<Text style={styles.header}>Nova tarefa</Text>
					<TextInput
						style={styles.input}
						autoFocus
						placeholder="Digite a descrição da tarefa"
						value={this.state.desc}
						onChangeText={(text) => this.setState({ desc: text })}
					/>
					{this.getTimePicker()}
					<View style={styles.buttonContainer}>
						<TouchableOpacity>
							<Text style={styles.button} onPress={onCancel}>
								Cancelar
							</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={styles.button}>Salvar</Text>
						</TouchableOpacity>
					</View>
				</View>
				<TouchableWithoutFeedback onPress={onCancel}>
					<View style={styles.background} />
				</TouchableWithoutFeedback>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		zIndex: 10
	},
	background: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)'
	},
	header: {
		fontFamily: commonStyles.fontFamily,
		backgroundColor: commonStyles.colors.today,
		color: commonStyles.colors.secondary,
		textAlign: 'center',
		fontSize: 18,
		padding: 20
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	button: {
		margin: 20,
		marginRight: 30,
		color: commonStyles.colors.today
	},
	input: {
		fontFamily: commonStyles.fontFamily,
		height: 40,
		backgroundColor: '#fff',
		borderColor: '#e3e3e3',
		borderWidth: 1,
		borderRadius: 6,
		margin: 15,
		paddingHorizontal: 15
	}
});
