using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class climb : MonoBehaviour {
	// Use this for initialization
	public bool mov;
	GameObject g;
	Vector3 tempgravity;
	GameObject d;
	void Start () {
		mov = false;
		d = GameObject.Find ("donut");
		d.SetActive (false);

		tempgravity = Physics.gravity;
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetButtonDown ("Jump2") && mov) {
			Vector3 t = g.transform.position;
			t.y = t.y+2;
			g.transform.position = t;
			g.GetComponent<Rigidbody> ().velocity = Vector3.zero;

		}
		if (Input.GetButtonDown ("UnJump") && mov) {
			Vector3 t = g.transform.position;
			t.y = t.y-.5f;
			g.transform.position = t;
			g.GetComponent<Rigidbody> ().velocity = Vector3.zero;

		}
	}
	void OnTriggerEnter(Collider col){
		g = col.gameObject;
		if(col.gameObject.tag == "Player"){
			mov = true;
			Physics.gravity = Vector3.zero;
			col.gameObject.GetComponent<Rigidbody> ().useGravity = false;
		}
	}
	void OnTriggerExit(Collider col){
		g = col.gameObject;
		if(col.gameObject.tag == "Player"){
			mov = false;
			Physics.gravity = tempgravity;
			col.gameObject.GetComponent<Rigidbody> ().useGravity = true;
			d.SetActive (true);
		}
	}
}
