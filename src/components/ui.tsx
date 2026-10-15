import { StyleSheet } from 'react-native';

export const colors = {
  purple: '#6C3BFF',
  white: '#FFFFFF',
  text: '#1B1923',
  gray: '#AAA9B2',
  lightPurple: '#F7F4FF',
  border: '#E8E0FF',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 28,
    paddingTop: 50,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    marginBottom: 25,
  },

  backText: {
    fontSize: 32,
    color: colors.purple,
  },

  title: {
    fontSize: 27,
    fontWeight: '700',
    color: colors.text,
  },

  subtitle: {
    fontSize: 17,
    color: colors.gray,
    marginTop: 5,
    marginBottom: 25,
  },

  inputContainer: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightPurple,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  inputIcon: {
    fontSize: 20,
    marginRight: 14,
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 18,
    color: colors.text,
  },

  button: {
    height: 60,
    backgroundColor: colors.purple,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },

  eyeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  eyeText: {
    fontSize: 20,
  },
});