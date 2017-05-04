using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Crab2 : MonoBehaviour {
	int toDeath;
	int toDeath2;
	Vector3 t;
	float moveSpeed;
	// Use this for initialization
	void Start () {
		toDeath=0;
		toDeath2 = 0;
		moveSpeed = -.1f;
	}

	// Update is called once per frame
	void Update () {
		if (toDeath > 2)
			Destroy (gameObject);
		if (toDeath2 > 5)
			Destroy (gameObject);
		//129 195
		t = transform.position;
		t.x += moveSpeed;
		if (t.x > 195)
			moveSpeed *= -1;
		if (t.x < 129)
			moveSpeed *= -1;
		transform.position = t;

	}
	void OnTriggerEnter(Collider c){
		if (c.tag == "Player") {
			//Debug.Log ("test");
			Player.lives--;
			//Destroy (c.collider);
		}
		if (c.tag == "spear") {
			toDeath++;
		}
		if (c.tag == "bullet") {
			toDeath2++;
		}
	}
}