import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

bool _isTextfieldVisibile = true;
TextEditingController _searchCtrl = TextEditingController();

List<String> _categoriesTxt = [
  'design',
  'camping',
  'surfing',
  'parcs',
  'hiking'
];

List<IconData> _listIc = [
  CupertinoIcons.add,
  CupertinoIcons.ant,
  CupertinoIcons.archivebox,
  CupertinoIcons.cube_box,
  CupertinoIcons.checkmark_seal,
];

int _currentIdx = 0;
bool _active = false;

class HomePAge extends StatefulWidget {
  @override
  _HomePAgeState createState() => _HomePAgeState();
}

class _HomePAgeState extends State<HomePAge> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
          child: Column(
        children: [
          //custom search
          Row(
            children: [
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(64)),
                      color: Colors.grey.shade100),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  margin:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  child: Row(
                    children: [
                      Icon(
                        CupertinoIcons.search,
                        color: Colors.black87,
                      ),
                      SizedBox(
                        width: 12,
                      ),
                      Visibility(
                        visible: _isTextfieldVisibile,
                        replacement: Expanded(
                          flex: 4,
                          child: TextField(
                            controller: _searchCtrl,
                            decoration: InputDecoration(hintText: 'search...'),
                          ),
                        ),
                        child: InkWell(
                          onTap: () {
                            setState(() {
                              _isTextfieldVisibile = !_isTextfieldVisibile;
                            });
                          },
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Where to?',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                              Text('Lorem Ipsum Dolor')
                            ],
                          ),
                        ),
                      ),
                      Spacer(),
                      Icon(
                        CupertinoIcons.slider_horizontal_3,
                        color: Colors.black87,
                      ),
                    ],
                  ),
                ),
              )
            ],
          ),

          //categories list
          Container(
            height: 100,
            child: ListView.builder(
                scrollDirection: Axis.horizontal,
                shrinkWrap: true,
                itemCount: _categoriesTxt.length,
                itemBuilder: (context, index) {
                  return InkWell(
                    onTap: () {
                      print(index);
                      int oldIndex = _currentIdx;
                      _currentIdx = index;

                      setState(() {
                        if (index == _currentIdx) {
                          oldIndex = _currentIdx;

                          _active = true;
                        }
                      });
                    },
                    // child: CategoryItem(
                    //   title: _categoriesTxt[index],
                    //   icon: _listIc[index],
                    //   isActive: _active,
                    // ),
                  );
                }),
          )
        ],
      )),
    );
  }
}
