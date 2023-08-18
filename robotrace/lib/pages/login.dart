import 'package:flutter/material.dart';
import 'package:robotrace/services/auth_services.dart';

class LoginPage extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void handleLogin() async {
    String email = emailController.text;
    String password = passwordController.text;

    try {
      String token = await AuthService.login(email, password);
      // Traitement du token de connexion
      print('Token: $token');
    } catch (e) {
      // Gestion des erreurs de connexion
      if (e.toString() == 'Mot de passe incorrect') {
        // Mot de passe incorrect
        print('Mot de passe incorrect');
      } else {
        // Autre erreur de connexion
        print('Erreur de connexion: $e');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: emailController,
              decoration: InputDecoration(
                labelText: 'Email',
              ),
            ),
            TextField(
              controller: passwordController,
              decoration: InputDecoration(
                labelText: 'Password',
              ),
            ),
            ElevatedButton(
              onPressed: handleLogin,
              child: Text('Login'),
            ),
          ],
        ),
      ),
    );
  }
}
