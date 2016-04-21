package com.qreal.example.dao;

import com.qreal.example.model.Palette;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by LChernigovskaya on 18.03.2016.
 */
@Repository
public class PaletteDAO {
    @Autowired
    private SessionFactory sessionFactory;

    public void createPalette(Palette palette) {
        Session session = sessionFactory.getCurrentSession();
        session.save(palette);
    }

    public Palette getPalette(String paletteName) {
        System.out.println(paletteName);
        Session session = sessionFactory.getCurrentSession();

        List<Palette> palettes = session.createQuery("from Palette where paletteName=:paletteName")
                .setParameter("paletteName", paletteName)
                .list();

        return palettes.get(0);
    }
}
