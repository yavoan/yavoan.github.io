using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class icemonkeys : MonoBehaviour {
	Vector3 t;
	public float time;
	public ParticleSystem p;
	// Use this for initialization
	void Start () {
		time = 0;
	}
	
	// Update is called once per frame
	void Update () {
		if (time < 2) {
			t = transform.position;
			t.x += .5f;
			transform.position = t;
		} else if (time > 2 && time < 4) {
			t = transform.position;
			t.x -= .5f;
			transform.position = t;
		} else
			time = 0;
		time += Time.deltaTime;
	}
	void OnTriggerEnter(Collider c){

		if (c.gameObject.name == "coconut") {
			Instantiate (p,transform.position,transform.rotation);
			p.Play();
			thrower.amountDestroyed++;
			Destroy (gameObject);
		}
	}
}
