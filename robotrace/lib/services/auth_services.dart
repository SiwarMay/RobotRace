import 'package:http/http.dart' as http;

class AuthService {
  static Future<String> login(String email, String password) async {
    var url =
        'http://localhost:3000/api/auth/login'; // URL de l'endpoint de login

    try {
      var response = await http.post(Uri.parse(url), body: {
        'email': email,
        'password': password,
      });

      if (response.statusCode == 200) {
        // Traitement de la réponse réussie
        return response.body;
      } else {
        // Gestion des erreurs
        if (response.statusCode == 401) {
          // Mauvais mot de passe
          throw Exception('Mot de passe incorrect');
        } else {
          throw Exception('Erreur: ${response.statusCode}');
        }
      }
    } catch (e) {
      // Gestion des erreurs de connexion
      throw Exception('Erreur de connexion: $e');
    }
  }

  // static Future<void> logout(String token) async {
  //   var url = 'http://votre-backend.com/api/logout'; // URL de l'endpoint de logout
  //   var response = await http.post(Uri.parse(url), headers: {
  //     'Authorization': 'Bearer $token',
  //   });

  //   if (response.statusCode == 200) {

  //     return;
  //   } else {

  //     throw Exception('Erreur: ${response.statusCode}');
  //   }
  // }
}
