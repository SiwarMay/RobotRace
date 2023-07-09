import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:robotrace/pages/home.dart';

TextEditingController _emailController = TextEditingController();
TextEditingController _passController = TextEditingController();
bool _isPassVisible = false;

bool _isClicked = false;

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
          child: SingleChildScrollView(
        child: Column(
          children: [
            Container(
                color: Colors.white,
                margin: EdgeInsets.all(14),
                child: TextField(
                  controller: _emailController,
                  decoration: InputDecoration(
                      prefixIcon: Icon(
                        CupertinoIcons.mail,
                        color: Colors.blue,
                      ),
                      hintText: 'enter email'),
                )),
            Container(
                color: Colors.white,
                margin: EdgeInsets.all(14),
                child: TextField(
                  obscureText: _isPassVisible,
                  controller: _passController,
                  decoration: InputDecoration(
                      suffix: TextButton(
                          onPressed: () {
                            setState(() {
                              _isPassVisible = !_isPassVisible;
                            });
                            print(_isPassVisible);
                          },
                          child: Text(_isPassVisible ? 'show' : 'hide')),
                      prefixIcon: Icon(
                        _isPassVisible
                            ? CupertinoIcons.lock
                            : CupertinoIcons.lock_open,
                        color: Colors.blue,
                      ),
                      hintText: 'enter email'),
                )),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(onPressed: () {}, child: Text('forget pass?')),
              ],
            ),
            CupertinoButton(
              child: Text(
                'login',
                style: TextStyle(color: Colors.red),
              ),
              onPressed: () {
                Navigator.push(context,
                    CupertinoPageRoute(builder: (context) => HomePAge()));
              },
              color: Colors.white,
            ),
            SizedBox(
              height: 14,
            ),
            CupertinoButton(
              child: Text(
                _isClicked ? 'off' : 'on',
                style: TextStyle(color: Colors.red),
              ),
              onPressed: () {
                setState(() {
                  _isClicked = !_isClicked;
                });
              },
              color: Colors.white,
            ),
            Row(
              children: [
                Expanded(
                  flex: 2,
                  child: Container(
                    height: 100,
                    color: Colors.red,
                  ),
                ),
                Expanded(
                  flex: 4,
                  child: Container(
                    height: 100,
                    color: Colors.blue,
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Container(
                    height: 100,
                    color: Colors.green,
                  ),
                ),
              ],
            )
          ],
        ),
      )),
    );
  }
}
