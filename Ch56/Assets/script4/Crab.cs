using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Crab : MonoBehaviour {
	int toDeath;
	int toDeath2;
	public float rotSpeed;
	public GameObject center;
	public Vector3 rotpos;
	public ParticleSystem p;
	// Use this for initialization
	void Start () {
		toDeath=0;
		toDeath2 = 0;
		rotpos = center.transform.position;
	}
	
	// Update is called once per frame
	void Update () {
		if (toDeath > 2) {
			Instantiate (p,transform.position,transform.rotation);
			p.Play ();
			Destroy (gameObject);
		}
		if (toDeath2 > 5) {
			Instantiate (p,transform.position,transform.rotation);
			p.Play ();
			Destroy (gameObject);
		}
		transform.RotateAround (rotpos, Vector3.up,rotSpeed);
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
