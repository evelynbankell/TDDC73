import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Laboration 1',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Example 1'),
          backgroundColor: Color(0xFF2d8577),
        ),
        body:
        Column(children: <Widget>[

        Row(
        children: [
        Container(
          child: Image.asset('assets/icon.png', height: 180.0, width: 180.0,),
          alignment: AlignmentDirectional.topCenter,
          margin: const EdgeInsets.only(left: 115.0),
          ),
        ],
        ),

        Row(
        children: [
            Container(
                child: FlatButton(
                    child: Text('BUTTON'),
                    onPressed: () {},
                    color: Color(0xFFd6d7d7),
                ),
                margin: const EdgeInsets.only(left: 65.0, top: 15,),
                alignment: AlignmentDirectional.bottomCenter,
                width: 100.0,
                height: 50.0,
            ),
            Container(
                child: FlatButton(
                    child: Text('BUTTON'),
                    onPressed: () {},
                    color: Color(0xFFd6d7d7),
                ),
            margin: const EdgeInsets.only(left: 80.0, top: 15,),
            alignment: AlignmentDirectional.bottomCenter,
            width: 100.0,
            height: 50.0,
            ),
        ],
        ),
        Row(
        children: [
            Container(
                child: FlatButton(
                    child: Text('BUTTON'),
                    onPressed: () {},
                    color: Color(0xFFd6d7d7),
                ),
            margin: const EdgeInsets.only(left: 65.0, top: 15,),
            alignment: AlignmentDirectional.center,
            width: 100.0,
            height: 50.0,
            ),
            Container(
                child: FlatButton(
                    child: Text('BUTTON'),
                    onPressed: () {},
                    color: Color(0xFFd6d7d7),
                ),
            margin: const EdgeInsets.only(left: 80.0, top: 15,),
            alignment: AlignmentDirectional.center,
            width: 100.0,
            height: 50.0,
            ),
        ],
        ),
        Row(
        children: [
            Container(
                width: 100,
                margin: const EdgeInsets.only(left: 30.0, top: 20.0,),
                child: Text('Email'),
            ),
            Container(
                width: 200,
                alignment: Alignment.centerRight,
                child: TextField(
                    cursorColor: Colors.red,
                    decoration: InputDecoration(
                        border: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.red),
                        ),
                        focusedBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.red),
                        ),
                        enabledBorder: UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.red),
                        ),
                    ),
                ),
            ),
            ],
        ),
        ],
        ),
      ),
    );
  }
}


