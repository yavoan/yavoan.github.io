using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Octopus : MonoBehaviour {
	public Vector3 pos;
	public float increment;
	int toDeath;
	int toDeath2;
	// Use this for initialization
	void Start () {
		//increment = .25f;
		toDeath=0;
		toDeath2 = 0;
	}
	
	// Update is called once per frame
	void Update () {
		pos = transform.position;
		pos.y += increment;
		if (pos.y > 25)
			increment *= -1;
		else if (pos.y < 4)
			increment *= -1;
		transform.position = pos;
		if (toDeath > 2)
			Destroy (gameObject);
		if (toDeath2 > 5)
			Destroy (gameObject);
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
