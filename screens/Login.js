import React, { useState, useEffect, useContext } from 'react';
import {
	Text,
	ScrollView,
	Dimensions,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
	ActivityIndicator,	
	Alert,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';  
import { LOGIN_URL } from "../constants/baseURLs";
import { colors } from '../Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get('screen');

const Login = ({ navigation }) => {

	const [userName, setUserName] = useState(undefined);
	const [password, setPassword] = useState(undefined);
	const [showPassword, setShowPassword] = useState(true);
	const [pageLoading, setPageLoading] = useState(true);
	const [loading, setLoading] = useState(false);	

	const device_token = 'zasdcvgtghnkiuhgfde345tewasdfghjkm';	
  
	useEffect(()=>{
		AsyncStorage.getItem('@access_token').then((token)=>{
			console.log();
			if(token)
			{
				navigation.navigate("Home");
			} 
			else{
				setPageLoading(false);							
			}
		});
	}, []);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	handleLoginIn = () =>{
		if(userName === undefined)
		{
			Alert.alert(
				"Error",
				"Please Enter Your Username",
				[{
					text: "OK",
					style: "cancel",
					},],
			);	
		}
		else if(password === undefined)
		{
			Alert.alert(
				"Error",
				"Please Enter Your Password",
				[{
					text: "OK",
					style: "cancel",
					},],
			);
		}
		else{
			data = {
				email: userName,
				password: password,
				device_token: device_token,				
			};
			setLoading(true);			
			axios.post(`${LOGIN_URL}`,data , {}).then((res) => {
				if (res.data.meta.status === 200) {		
					let access_token = res.data.data.access_token;
					AsyncStorage.setItem('@access_token', access_token);			
					navigation.navigate('Home');					
				} else {
					Alert.alert(
							"Error",
							"Incorrect username or password",
							[{
								text: "OK",
								style: "cancel",
								},],
						);
					setLoading(false);
				}
			}).catch((err) => {
				console.log('error ',err);
			});			
		}//end of else

	}//end of handleLoginIn

	return (

    <ScrollView style={{ flex: 1, backgroundColor: '#CDF8DD' }} showsVerticalScrollIndicator={false}>			
			{!pageLoading ? <View style={styles.bottomView}>
				<View style={{ padding: 30 }}>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 28,
							textAlign: 'center',							
						}}
					>
						Hello Again!
					</Text>

					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
						<View style={{paddingTop: 5,paddingLeft:60, paddingRight: 60}}>
							<Text
								style={{								
									textAlign: 'center',								
									fontSize: 20,
									color: 'black',
								}}
							>
								Chance to get your life better
							</Text>	
						</View>					
					</View>

					<View style={{ paddingTop: 15 }}>
						<View style={styles.inputContainer}>							
							<View style={styles.input}>
								<TextInput
									style={{ flex: 1 }}
									placeholder="Enter username"
									value={userName}
									placeholderTextColor={colors.placeholderColor}
									onChangeText={(text) => setUserName(text)}
								/>
							</View>
						</View>

						<View style={styles.inputContainer}>							
							<View style={styles.input}>
								<TextInput
									style={{ flex: 1 }}
									secureTextEntry={showPassword}
									placeholder="Password"
									value={password}
									placeholderTextColor={colors.placeholderColor}
									onChangeText={(text) => setPassword(text)}
								/>
							</View>
							<TouchableOpacity onPress={handleShowPassword}>
								<Entypo name={showPassword === true ? 'eye' : 'eye-with-line'} size={24} color={colors.placeholderColor} />
							</TouchableOpacity>
						</View>

						<View style={styles.forgotPass}>
							<TouchableOpacity>
								<Text style={{color: 'black'}}> Recovery Password?</Text>
							</TouchableOpacity>
						</View>

						<View style={{ marginTop: 5 }}>
							{loading ? <ActivityIndicator size="large" color={colors.loaderColor} /> : <TouchableOpacity
								onPress={handleLoginIn}
								style={styles.loginButton}
							>
								<Text style={styles.loginText}>Login</Text>
							</TouchableOpacity>}
						</View>

						<View style={{ flex: 1}}>
							<Text style={{ textAlign: 'center',color: 'black' }}>or continue with</Text>
							<View style={styles.socialLoginButtons}>								
								
								<TouchableOpacity>
									<View style={styles.socialImageView}>
									<Image
										source={require('../assets/images/Google.png')}
										style={styles.socialImage}
									></Image>
									</View>
								</TouchableOpacity>
								
								
								<TouchableOpacity>
								<View style={styles.socialImageView}>
									<Image
										source={require('../assets/images/apple.png')}
										style={styles.socialImage}
									></Image>
									</View>
								</TouchableOpacity>
								
								
								<TouchableOpacity>
									<View style={styles.socialImageView}>
										<Image
											source={require('../assets/images/facebook.png')}
											style={styles.socialImage}
										></Image>
									</View>
								</TouchableOpacity>
								
							</View>	
							<View style={{ justifyContent: 'center', marginTop: 50, flex: 1, flexDirection: 'row' }}>
								<Text
									style={{
										color: '#6E8571',
										textAlign: 'center',																				
									}}
								>
									Not a member? 									
								</Text>
								<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
									<Text
										style={styles.registerNow}
									>
										Register Now
									</Text>
								</TouchableOpacity>
								
							</View>						
						</View>

					</View>
				</View>
			</View>
			:<ActivityIndicator size="large" color={colors.loaderColor} style={{paddingTop: height/2}} />
				
			}
		</ScrollView>
	);
};


export default Login;

const styles = StyleSheet.create({
	bottomView: {		
		backgroundColor: '#CDF8DD',	
		textAlignVertical: 'center',
		paddingTop: 100,
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		width: width / 1.2,
		borderRadius: 15,
		marginVertical: 10,
		marginTop: 20,
	},
	input: {
		flex: 0.8,
		padding: 15,		
		backgroundColor: '#ffffff',
	},
	forgotPass: {
		height: 30,
		marginTop: 5,
		flexDirection: 'row',	
		alignSelf: 'flex-end',		
	},
	socialLoginButtons: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		margin: 20,
		marginBottom: -30
	},
	loginButton: {
		borderColor: colors.secondary,
		padding: 15,
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: '#2BBA61',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		marginBottom: 20,
		elevation: 11,
	},
	loginText: {
		fontSize: 14,
		fontWeight:'bold',
		color: '#fff',
		textAlign: 'center',
	},
	socialImageView: {
		borderColor:'#FFFFFF',
		borderRadius: 10,
		borderWidth: 2,
		marginRight: 10,
		marginLeft: 10,
	},
	socialImage: {
		height: 30,
		margin: 10,
		width: 30
	},
	registerNow: {
		color: '#28AA57',
		fontWeight: 'bold',											
		textAlign: 'center',
		paddingLeft: 5,
	}
});
